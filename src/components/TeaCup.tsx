import React, { FC, useMemo, useEffect, useState, useRef, createRef, RefObject } from "react";

interface ChartData {
    name: string;
    amount: number;
    color: string;
}

interface IProps {
    width: number | string;
    cupBottomH: number;
    cupMaxH: number;
    maxWidth?: number;
    minWidth?: number;
    data: ChartData[] | undefined;
}

const TeaCup: FC<IProps> = ({
    width,
    cupBottomH,
    cupMaxH,
    data,
    maxWidth,
    minWidth
}) => {
    const teaCup = useRef<HTMLDivElement>(null);
    const [teasHPercent, setTeasHPercent] = useState<number>(0);
    const [firstOpacity, setFirstOpacity] = useState<number>(0);
    const [secondOpacity, setSecondOpacity] = useState<number>(0);
    const [thirdOpacity, setThirdOpacity] = useState<number>(0);
    const [percent, setPercent] = useState(0);
    const [style, setStyle] = useState<{
        width: number | string, 
        height: number, 
        maxWidth: string | number, 
        minWidth: string | number
    }>({ width, height: 0, maxWidth: maxWidth? maxWidth: "100%", minWidth: minWidth? minWidth : 0 })

    useEffect(() => {
        window.addEventListener("scroll", handleScrollEvent);
        window.addEventListener("resize", calculateSize);
        return () => {
            window.removeEventListener("scroll", handleScrollEvent)
            window.removeEventListener("resize", calculateSize);
        }
    }, [])

    useEffect(() => {
        handleScrollEvent();
        calculateSize();
    }, [])

    useEffect(() => {
        handlePercent();
    }, [percent])

    const calculateSize = () => {
        let mainStyle = Object.assign({}, style);
        if(teaCup.current) {
            if(maxWidth) {
                mainStyle.maxWidth = maxWidth;
            }
            if(minWidth) {
                mainStyle.minWidth = minWidth;
            }
            mainStyle.height =  teaCup.current.offsetWidth * 1.17647;
        }
        setStyle(mainStyle);
        handleScrollEvent();
    }

    const handleScrollEvent = () => {
        const totalScrollH = document.body.scrollHeight - window.innerHeight;
        const percent = window.scrollY / totalScrollH;
        setPercent(percent);
        
    }

    const handlePercent = () => {
        if(percent <= 0.1) {
            handleFirstPath();
        }
        else if(percent <= 0.2) {
            handleSecondPath();
        }
        else if(percent <= 0.4) {
            handleThirdPath();
        }
        else {
            handleTeaHeight();
        }
    }
    
    const handleFirstPath = () => {
        let opacity = percent / 0.1 * 100;
        setFirstOpacity(opacity);
        if(secondOpacity) {
            setSecondOpacity(0)
        }
        if(thirdOpacity) {
            setThirdOpacity(0)
        }
        if(teasHPercent) {
            setTeasHPercent(0)
        }
    }

    const handleSecondPath = () => {
        let opacity = (percent - 0.1) / 0.1 * 100;
        setSecondOpacity(opacity);
        if(firstOpacity < 100) {
            setFirstOpacity(100)
        }
        if(thirdOpacity) {
            setThirdOpacity(0)
        }
        if(teasHPercent) {
            setTeasHPercent(0)
        }
    }

    const handleThirdPath = () => {
        let opacity = (percent - 0.2) / 0.2 * 100;
        setThirdOpacity(opacity);
        if(firstOpacity < 100) {
            setFirstOpacity(100)
        }
        if(secondOpacity < 100) {
            setSecondOpacity(100)
        }
        if(teasHPercent) {
            setTeasHPercent(0)
        }
    }

    const handleTeaHeight = () => {
        setTeasHPercent((percent - 0.4) / 0.6);
        if(secondOpacity < 100) {
            setSecondOpacity(100)
        }
        if(thirdOpacity < 100) {
            setThirdOpacity(100)
        }
        if(firstOpacity < 100) {
            setFirstOpacity(100)
        }
    }

    const teasStyle = useMemo(() => {
        let teasStyle = {
            height: style.height * (cupMaxH - cupBottomH) / 100
        }
        return teasStyle
    }, [style])

    const maskStyle = {
        bottom: `${cupBottomH}%`,
        height: `${ (cupMaxH - cupBottomH) * teasHPercent }%`
    }

    const chartsElement: JSX.Element[] | undefined = useMemo(() => {
        if(!data) return;
        const initialValue = 0;
        const totlaAmount = data.reduce(
            (previousValue, currentValue) => previousValue + currentValue.amount,
            initialValue
        );
        let charts: JSX.Element[] = data.map((chartData) => {
            let percent = (chartData.amount / totlaAmount) * 100
            let style = {
                height: `${percent}%`,
                backgroundColor: chartData.color
            }
            return <div className="teaCup_tea" style={style} key={chartData.color}></div>
        })
        return charts;
    }, [data, style])
    
    return <div className="teaCup" style={style} ref={teaCup}>
        <svg version="1.0" className="teaCup_background" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 645.000000 771.000000"
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                <linearGradient id="first" x1="0.5" y1="1" x2="0.5" y2="0">
                    <stop offset="0%" stopOpacity="1" stopColor="#ffffff"/>
                    <stop offset={`${firstOpacity}%`} stopOpacity="1" stopColor="#ffffff"/>
                    <stop offset={`${firstOpacity}%`} stopOpacity="0" stopColor="#ffffff"/>
                    <stop offset="100%" stopOpacity="0" stopColor="#ffffff"/>
                </linearGradient>
                <linearGradient id="second" x1="0.5" y1="1" x2="0.5" y2="0">
                    <stop offset="0%" stopOpacity="1" stopColor="#ffffff"/>
                    <stop offset={`${secondOpacity}%`} stopOpacity="1" stopColor="#ffffff"/>
                    <stop offset={`${secondOpacity}%`} stopOpacity="0" stopColor="#ffffff"/>
                    <stop offset="100%" stopOpacity="0" stopColor="#ffffff"/>
                </linearGradient>
                <linearGradient id="third">
                    <stop offset="0%" stopOpacity="1" stopColor="#ffffff"/>
                    <stop offset={`${thirdOpacity}%`} stopOpacity="1" stopColor="#ffffff"/>
                    <stop offset={`${thirdOpacity}%`} stopOpacity="0" stopColor="#ffffff"/>
                    <stop offset="100%" stopOpacity="0" stopColor="#ffffff"/>
                </linearGradient>
            </defs>
            <g transform="translate(0.000000,771.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none"
            >
                <path d="M2915 7620 c-33 -5 -104 -23 -157 -41 -208 -67 -329 -197 -352 -377
                -9 -68 6 -66 47 4 85 145 200 204 399 204 249 0 455 -84 624 -254 121 -122
                200 -258 235 -404 18 -73 20 -108 16 -222 -5 -147 -24 -236 -77 -363 -59 -142
                -113 -208 -431 -529 -319 -322 -379 -395 -459 -562 -54 -113 -67 -191 -51
                -299 13 -87 36 -138 69 -156 18 -10 20 -5 24 72 8 122 37 178 151 294 51 53
                159 145 242 207 83 62 220 164 305 228 175 130 285 234 368 347 295 397 322
                977 66 1363 -148 223 -410 403 -679 469 -94 23 -255 32 -340 19z" fill="url(#first)"/>
                <path d="M1565 6785 c-266 -59 -494 -254 -605 -514 -113 -266 -103 -607 26
                -880 144 -306 435 -530 832 -640 59 -16 166 -46 237 -66 247 -68 337 -133 386
                -277 l17 -51 28 43 c60 90 38 248 -50 368 -78 105 -168 171 -466 337 -219 123
                -304 180 -403 274 -95 91 -158 184 -199 293 -26 71 -31 101 -35 203 -9 211 42
                360 162 481 101 101 236 157 380 157 160 1 325 -77 483 -227 74 -71 95 -87
                103 -75 14 21 4 53 -53 169 -45 92 -63 116 -142 195 -76 75 -107 99 -186 138
                -127 63 -226 87 -354 86 -56 0 -128 -7 -161 -14z" fill="url(#second)"/>
                <path d="M4885 4166 c-71 -23 -154 -49 -183 -56 -65 -15 -105 -52 -127 -120
                -14 -43 -17 -97 -16 -378 1 -180 2 -383 3 -452 1 -69 -2 -195 -6 -280 -4 -85
                -9 -211 -11 -280 -6 -220 -35 -336 -126 -504 -45 -83 -73 -118 -169 -215 -63
                -64 -132 -127 -153 -141 -21 -14 -57 -40 -80 -58 -116 -90 -410 -173 -677
                -191 -14 0 -236 -3 -495 -6 -516 -5 -894 6 -1025 28 -100 18 -251 55 -265 66
                -5 5 -23 13 -40 18 -64 22 -176 102 -261 184 -290 281 -384 424 -454 689 -49
                185 -53 247 -54 915 l-1 620 -27 46 c-22 37 -40 52 -92 78 -70 34 -113 43
                -304 61 -150 15 -161 10 -142 -61 8 -28 13 -142 14 -314 1 -149 5 -275 8 -281
                4 -5 11 -127 17 -269 18 -429 21 -485 36 -610 8 -66 17 -155 20 -199 2 -43 9
                -93 15 -110 28 -89 40 -135 46 -176 4 -25 24 -84 45 -131 22 -48 39 -90 39
                -94 0 -15 93 -194 130 -250 22 -33 48 -76 59 -95 31 -56 209 -245 303 -323 29
                -23 105 -95 168 -158 174 -173 358 -308 518 -381 49 -22 62 -33 62 -51 0 -20
                -8 -24 -93 -39 -148 -28 -219 -53 -262 -95 -48 -47 -68 -93 -59 -141 17 -96
                43 -111 300 -175 269 -68 397 -87 664 -99 266 -11 1085 -4 1285 11 330 26 819
                93 926 127 155 49 227 156 169 252 -11 18 -34 41 -51 51 -34 21 -203 67 -379
                104 -63 14 -133 32 -154 41 -53 22 -49 25 154 128 538 275 744 471 826 786 14
                53 30 103 37 111 22 26 71 39 182 46 307 18 514 88 760 256 184 125 280 219
                335 329 39 77 47 114 66 290 30 290 -5 480 -130 695 -60 103 -183 223 -276
                268 -114 57 -211 69 -722 96 -64 3 -122 11 -128 17 -6 6 -18 56 -26 110 -16
                107 -9 195 21 240 31 48 10 104 -40 104 -13 0 -29 2 -37 5 -7 2 -71 -15 -143
                -39z m523 -746 c78 -6 165 -15 192 -21 101 -22 233 -135 297 -256 51 -95 63
                -157 63 -333 0 -259 -21 -322 -145 -438 -189 -177 -385 -263 -634 -279 l-104
                -6 7 49 c4 27 12 78 17 114 5 36 12 308 15 605 4 297 10 548 15 557 10 19 37
                25 94 21 22 -2 104 -8 183 -13z" fill="url(#third)"/>
            </g>
        </svg>
        <div className="teaCup_mask" style={maskStyle}>
            <div className="teaCup_teas" style={teasStyle}>
                { chartsElement }
            </div>
        </div>
    </div>
}

export default TeaCup;