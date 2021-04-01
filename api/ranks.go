package api

import (
	"fmt"
	"math"
	"net/http"
	"regexp"
	"strconv"
	"strings"

	"github.com/labstack/echo/v4"
	"s32x.com/ovrstat/ovrstat"
)

func handleRanks(r *echo.Echo) {
	r.GET("/ranks", getRanksHandler)
}

type OverallPerformances struct {
	Winrate float64 `json:"winrate"`
	Ratio   float64 `json:"ratio"`
}

type Rating struct {
	Damage    int `json:"damage"`
	Tank      int `json:"tank"`
	Support   int `json:"support"`
	OpenQueue int `json:"openqueue"`
}

type Character struct {
	Name          string  `json:"name"`
	OnFire        float64 `json:"onfire"`
	TimePlayed    float64 `json:"timeplayed"`
	TimePlayedMax float64 `json:"timeplayedmax"`
	Winrate       float64 `json:"winrate"`
	Elimination   float64 `json:"elimination"`
	ObjKills      float64 `json:"objkills"`
	ObjTime       float64 `json:"objtime"`
	Damage        int     `json:"damage"`
	Healing       int     `json:"healing"`
	Deaths        float64 `json:"deaths"`
	WeaponAcc     int     `json:"weaponacc"`
	CriticalHits  int     `json:"criticalhits"`
	FinalBlows    float64 `json:"finalblows"`
	SoloKills     float64 `json:"solokills"`
	ShieldDamage  int     `json:"shielddamage"`
}

type Request struct {
	Rating              Rating              `json:"rating"`
	OverallPerformances OverallPerformances `json:"overallperformance"`
	Characters          []Character         `json:"characters"`
}

func getRanksFromArray(ratings []ovrstat.Rating) Rating {
	var __ratings Rating
	for _, rating := range ratings {
		switch rating.Role {
		case "damage":
			__ratings.Damage = rating.Level
		case "tank":
			__ratings.Tank = rating.Level
		case "support":
			__ratings.Support = rating.Level
		default:
			__ratings.OpenQueue = rating.Level
		}
	}
	return __ratings
}

func interfaceToInt(value interface{}) int {
	val, ok := value.(int)
	if !ok {
		return 0
	}
	return val
}

func interfaceToFloat(value interface{}) float64 {
	val, ok := value.(float64)
	if !ok {
		return 0
	}
	return val
}

func interfaceToString(value interface{}) string {
	val, ok := value.(string)
	if !ok {
		return "0:0"
	}
	return val
}

func getRatio(games map[string]interface{}, value1, value2 string, sum bool) float64 {
	var val1 = games[value1]
	var val2 = games[value2]
	val1Int := interfaceToInt(val1)
	val2Int := interfaceToInt(val2)

	divisor := val2Int
	if sum {
		divisor += val1Int
	}
	if divisor == 0 {
		return 0
	}
	return math.Round(float64(val1Int)/float64(divisor)*1000) / 1000
}

func reverse(s []string) {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
}

func stringArrayToFloatArray(s []string) []float64 {
	result := make([]float64, len(s))
	for i := 0; i < len(s); i++ {
		value, err := strconv.ParseFloat(s[i], 64)
		if err != nil {
			fmt.Println("stringArrayToFloatArray error")
			result[i] = 0
		} else {
			result[i] = value
		}
	}
	return result
}

func timeStringToMinutes(time string) float64 {
	split := strings.Split(time, ":")
	reverse(split)
	floats := stringArrayToFloatArray(split)
	value := 0.
	value += floats[0] / 100
	if len(floats) > 1 {
		value += floats[1]
	}
	if len(floats) > 2 {
		value += floats[2] * 60
	}

	return value
}

func statsRegex(s string) int {
	re := regexp.MustCompile("[0-9]+")
	strings := re.FindAllString(s, -1)
	if len(strings) != 0 {
		value, err := strconv.Atoi(strings[0])
		if err != nil {
			return 0
		}
		return value
	}
	return 0

}

//bad code
func getCharacter(playerStats *ovrstat.PlayerStats, competitiveMode bool, name string) Character {
	account := playerStats.QuickPlayStats
	if competitiveMode {
		account = playerStats.CompetitiveStats
	}
	topHeroes := account.TopHeroes[name]
	careerStats := account.CareerStats[name]

	timePlayed := timeStringToMinutes(topHeroes.TimePlayed)

	return Character{
		Name:          name,
		OnFire:        math.Round(timeStringToMinutes(interfaceToString(careerStats.Combat["timeSpentOnFire"]))/timePlayed*1000) / 10,
		TimePlayed:    timePlayed,
		TimePlayedMax: 10000,
		Winrate:       getRatio(careerStats.Game, "gamesWon", "gamesLost", true) * 100,
		Elimination:   interfaceToFloat(careerStats.Average["eliminationsAvgPer10Min"]),
		ObjKills:      interfaceToFloat(careerStats.Average["objectiveKillsAvgPer10Min"]),
		ObjTime:       timeStringToMinutes(interfaceToString(careerStats.Average["objectiveTimeAvgPer10Min"])),
		Damage:        interfaceToInt(careerStats.Average["allDamageDoneAvgPer10Min"]),
		Healing:       interfaceToInt(careerStats.Average["healingDoneAvgPer10Min"]), // ? self healing ?
		Deaths:        interfaceToFloat(careerStats.Average["deathsAvgPer10Min"]),
		WeaponAcc:     statsRegex(interfaceToString(careerStats.Combat["weaponAccuracy"])),
		CriticalHits:  statsRegex(interfaceToString(careerStats.Combat["criticalHitsAccuracy"])), // ?
		FinalBlows:    interfaceToFloat(careerStats.Average["finalBlowsAvgPer10Min"]),
		SoloKills:     interfaceToFloat(careerStats.Average["soloKillsAvgPer10Min"]),
		ShieldDamage:  interfaceToInt(careerStats.Average["barrierDamageDoneAvgPer10Min"]),
	}
}

func getRanksHandler(c echo.Context) error {
	playerStats, err := ovrstat.PCStats("tagri-2865")

	competitiveMode := true

	account := playerStats.QuickPlayStats
	if competitiveMode {
		account = playerStats.CompetitiveStats
	}

	rating := getRanksFromArray(playerStats.Ratings)
	winrate := getRatio(account.CareerStats["allHeroes"].Game, "gamesWon", "gamesLost", true) * 100
	ratio := getRatio(account.CareerStats["allHeroes"].Combat, "eliminations", "deaths", false)
	character := getCharacter(playerStats, competitiveMode, "genji")
	character2 := getCharacter(playerStats, competitiveMode, "ana")

	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, Request{
		rating,
		OverallPerformances{
			winrate,
			ratio,
		},
		[]Character{character, character2},
	})
}
