import ReactSpeedometer, { Transition } from "react-d3-speedometer"

type Props = {
    min: number
    max: number
    value: number
    name: string
    width? :number
    height? :number
}

export default function Odometer(props: Props) {
    var min = props.min;
    var max = props.max;
    var width = props.width;
    var height = props.height;
    if (props.value < props.min)
        min = props.value;
    if (props.value > props.max)
        max = props.value;



    if (props.width == undefined) {
        width = 225
    }
    if (props.height == undefined) {
        height = 225
    }

    return (
        <ReactSpeedometer
            forceRender={true}
            maxSegmentLabels={1}
            customSegmentStops={[min, props.value, max]}
            segmentColors={['#f5a52a', '#141b23']}
            needleColor={'#f0f0f0'}
            currentValueText={`${props.name}: ${props.value}`}
            minValue={min}
            maxValue={max}
            value={props.value}
            textColor={'#f0f0f0'}
            needleHeightRatio={0.6}
            ringWidth={10}
            needleTransitionDuration={2000}
            needleTransition={Transition.easeElastic}
            width={width}
            height={height}
        />
    );
}