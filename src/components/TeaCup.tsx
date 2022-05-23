import React, { FC, useMemo, useEffect, useState } from "react";

interface ChartData {
    name: string;
    percent: number;
    color: string;
}

interface IProps {
    width: number;
    cupBottomH: number;
    cupMaxH: number;
    data?: ChartData[] | undefined;
}

const TeaCup: FC<IProps> = ({
    width,
    cupBottomH,
    cupMaxH,
    data
}) => {
    const [teasHPercent, setTeasHPercent] = useState<number>(0);
    const [teasCupH, setTeasCupH] = useState<number>(0);

    const height = useMemo(() => {
        return width * 1.17647
    }, [width])

    useEffect(() => {
        const handleScrollEvent = () => {
            const totalScrollH = document.body.scrollHeight - window.innerHeight;
            const percent = window.scrollY / totalScrollH;
            if(percent <= 0.3) {
                if(teasHPercent) {
                    setTeasHPercent(0);
                }
                let h = height * percent / 0.3;
                setTeasCupH(h);
            }
            else {
                if(teasCupH !== height) {
                    setTeasCupH(height);
                }
                setTeasHPercent((percent - 0.3) / 0.7);
            }
        }
        handleScrollEvent();
        window.addEventListener("scroll", handleScrollEvent);
        return () => {
            window.removeEventListener("scroll", handleScrollEvent)
        }
    }, [cupBottomH])
    
    const style = {
        width,
        height
    }

    const teasStyle = {
        height: height * (cupMaxH - cupBottomH) / 100
    }

    const maskStyle = {
        bottom: `${cupBottomH}%`,
        height: `${ (cupMaxH - cupBottomH) * teasHPercent }%`
    }

    const teaCupMaskStyle = {
        width,
        height: teasCupH
    }

    const chartsElement: JSX.Element[] | undefined = useMemo(() => {
        if(!data) return;
        let allPercent: number = 0;
        let charts: JSX.Element[] = data.map((chartData) => {
            allPercent += chartData.percent;
            let style = {
                height: `${chartData.percent}%`,
                backgroundColor: chartData.color
            }
            return <div className="teaCup_tea" style={style} key={chartData.color}></div>
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
    
    return <div className="teaCup" style={teaCupMaskStyle}>
        <div className="teaCup_container" style={style}>
            <div className="teaCup_background" style={style}></div>
            <div className="teaCup_mask" style={maskStyle}>
                <div className="teaCup_teas" style={teasStyle}>
                    { chartsElement }
                </div>
            </div>
        </div>
    </div>
}

export default TeaCup;