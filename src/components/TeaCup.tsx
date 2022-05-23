import React, { FC, useMemo, useEffect, useState } from "react";

interface ChartData {
    name: string;
    percent: number;
    color: string;
}

interface IProps {
    width: number;
    height: number;
    cupBottomH: number;
    cupMaxH: number;
    data?: ChartData[] | undefined;
}

const TeaCup: FC<IProps> = ({
    width,
    height,
    cupBottomH,
    cupMaxH,
    data
}) => {
    const [teasHPercent, setTeasHPercent] = useState<number>(0);


    useEffect(() => {
        handleScrollEvent();
        window.addEventListener("scroll", handleScrollEvent);
        return () => {
            window.removeEventListener("scroll", handleScrollEvent)
        }
    }, [])

    const getTeaHPercent = (percent: number) => {
        let h = 100 - cupBottomH - 33 * percent;
        setTeasHPercent(h);
    }
    
    const handleScrollEvent = () => {
        const totalScrollH = document.body.scrollHeight - window.innerHeight;
        const percent = window.scrollY / totalScrollH;
        getTeaHPercent(percent);
    }

    const style = {
        width,
        height
    }

    const teasStyle = {
        top: `${teasHPercent}%`,
        height: `${ cupMaxH - cupBottomH}%`
    }

    const chartsElement: JSX.Element[] | undefined = useMemo(() => {
        if(!data) return;
        let charts: JSX.Element[] = [];
        let allPercent: number = 0;
        data.map((chartData) => {
            allPercent += chartData.percent;
            let style = {
                height: `${chartData.percent}%`,
                backgroundColor: chartData.color
            }
            let chart = <div className="teaCup_tea" style={style}></div>
            charts.push(chart);
        })
        const extraPercent = 100 - allPercent;
        let style = {
            height: `${extraPercent}%`,
            backgroundColor: "silver"
        }
        let chart = <div className="teaCup_tea" style={style}></div>
        charts.push(chart);
        return charts;
    }, [data])
    
    return <div className="teaCup" style={style}>
        <div className="teaCup_background" style={style}></div>
        <div className="teaCup_teas" style={teasStyle}>
            { chartsElement }
        </div>
    </div>
}

export default TeaCup;