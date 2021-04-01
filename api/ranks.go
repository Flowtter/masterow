package api

import (
	"math"
	"net/http"

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

type Request struct {
	Rating              Rating              `json:"rating"`
	OverallPerformances OverallPerformances `json:"overallperformance"`
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

func getRatio(games map[string]interface{}, value1, value2 string, sum bool) float64 {
	var val1 = games[value1]
	val1Int, ok := val1.(int)
	if !ok {
		return 0
	}
	var val2 = games[value2]
	val2Int, ok := val2.(int)
	if !ok {
		return 0
	}
	divisor := val2Int
	if sum {
		divisor += val1Int
	}
	return math.Round(float64(val1Int)/float64(divisor)*1000) / 1000
}

func getRanksHandler(c echo.Context) error {
	playerstats, err := ovrstat.PCStats("tagri-2865")

	competitiveMode := true

	account := playerstats.QuickPlayStats
	if competitiveMode {
		account = playerstats.CompetitiveStats
	}

	rating := getRanksFromArray(playerstats.Ratings)
	winrate := getRatio(account.CareerStats["allHeroes"].Game, "gamesWon", "gamesLost", true) * 100
	ratio := getRatio(account.CareerStats["allHeroes"].Combat, "eliminations", "deaths", false)

	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, Request{
		rating,
		OverallPerformances{
			winrate,
			ratio,
		},
	})
}
