"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, ResponsiveContainer, Cell, LineChart, Line, RadarChart, PolarRadiusAxis, PolarAngleAxis, PolarGrid, Radar, Legend, ReferenceLine } from 'recharts';
import { VictoryPie } from "victory";

export default function TeamView() {
  const [data, setData] = useState(null);
  const searchParams = useSearchParams();
  let team = searchParams.get("team");
  const Colors = [
    ["#116677", "#84C9D7", "#8CCCD9", "#C4EEF6"],
    ["#003F7E", "#84AED7", "#A2C8ED", "#D8EAFB"],
    ["#15007E", "#9D8CF3", "#BFB2FF", "#DDD6FF"],
    ["#9F5EB5", "#C284D7", "#DBA2ED", "#F3D8FB"],
  ]
    //get data
    useEffect(() => {
      //TODO: Get Data (from localstorage if cached recently)
      //fetch("/api/get-alliance-data").then(resp => resp.json()).then(data => setData(data));
      setData({
          team: 2485,
          teamName: "W.A.R. Lords",
          autoScore: 15,
          teleScore: 27,
          endScore: 5,
          espmOverTime: [
            {matchNum: 5, score: 47},
            {matchNum: 10, score: 38},
            {matchNum: 50, score: 55},
          ],
          noShow: .01,
          breakdown: .08,
          lastBreakdown: 3,
          matchesScouted: 3,
          scouts: ["yael", "ella", "preston",],
          generalComments: ["very good", "incredible", "amazing",],
          breakdownComments: ["the shooter broke",],
          defenseComments: ["very good at defense", "defended well",],
          auto: {
            leave: .95,
            autoOverTime: [
              {matchNum: 5, score: 10},
              {matchNum: 10, score: 9},
              {matchNum: 50, score: 8},
            ],
            autoNotes: {
              total: 3.2,
              ampSuccess: .92,
              ampAvg: 1.2,
              spkrSuccess: .89,
              spkrAvg: 2
            }},
          tele: {
            teleOverTime: [
              {matchNum: 5, score: 30},
              {matchNum: 10, score: 29},
              {matchNum: 50, score: 28},
            ],
            teleNotes: {
              amplified: .43,
              total: 20,
              ampSuccess: .96,
              ampAvg: 9.2,
              spkrSuccess: .94,
              spkrAvg: 10.8
            },
          },
          endgame: {
            stage: {
              none: 5,
              park: 5,
              onstage: 70,
              onstageHarmony: 20,
            },
            onstageAttempt: .78,
            onstageSuccess: .95,
            harmonySuccess: .75,
            onstagePlacement: {
              center: .82,
              side: .18,
            },
            trapSuccess: .6,
            trapAvg: .5,
          },
          intake: {
            ground: true,
            source: false,
          },
          qualitative: [
            {name: "Onstage Speed", rating: 5},
            {name: "Harmony Speed", rating: 1},
            {name: "Trap Speed", rating: 2},
            {name: "Amp Speed", rating: 4},
            {name: "Apeaker Speed", rating: 1},
            {name: "Stage Hazard", rating: 3},
            {name: "Defense Evasion", rating: 0},
            {name: "Aggression", rating: 5},
            {name: "Maneuverability", rating: 2},
          ],
      })
    }, []);

  if (data == null) {
    return(
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  const EndgameData = [{ x: 'None', y: data.endgame.stage.none },
    { x: 'Park', y: data.endgame.stage.park },
    { x: 'Onstage', y: data.endgame.stage.onstage },
    { x: 'Harmony', y: data.endgame.stage.onstageHarmony }];

  function CBox({title, value, color1, color2}) {
    return (
      <div style={{backgroundColor: color2}} className={styles.CBox}>
        <div style={{backgroundColor: color1}}>{title}</div>
        <div className={styles.CBoxValue}>{value}</div>
      </div>
    )
  }

  function HBox({title, value, color1, color2}) {
    return (
      <table>
        <tr>
          <td style={{backgroundColor: color1}}>{title}</td>
          <td style={{backgroundColor: color2, fontSize: "13px"}}>{value}</td>
        </tr>
      </table>
    )
  }

  function Comments({title, value, color1, color2}) {
    return (
      <div style={{backgroundColor: color2}} className={styles.commentsBox}>
        <p style={{backgroundColor: color1}} className={styles.comments}>{title}</p>
        <input className={styles.commentValue} value={value}></input>
      </div>
    )
  }

  function BigBox({HC1, HC2, HR1, R1C1, R1C2, HR2, R2C1, R2C2, color1, color2, color3}) {
    return (
      <table className={styles.BigBox}>
        <colgroup>
          <col span="1" style={{backgroundColor: color1}}></col>
          <col span="2" style={{backgroundColor: color3}}></col>
        </colgroup>
        <th style={{backgroundColor: "white", borderLeftColor: "white", borderTopColor: "white"}}></th><th style={{backgroundColor: color2}}>{HC1}</th><th style={{backgroundColor: color2}}>{HC2}</th>
        <tr>
          <td>{HR1}</td>
          <td>{R1C1}</td>
          <td>{R1C2}</td>
        </tr>
        <tr>
          <td>{HR2}</td>
          <td>{R2C1}</td>
          <td>{R2C2}</td>
        </tr>
      </table>
    )
  }

  return (
    <div className={styles.MainDiv}>
      <div className={styles.leftColumn}>
      <h1 style={{color: Colors[0][0]}}>Team {data.team} View</h1>
      <div className={styles.lightBorderBox}>
        <div className={styles.scoreBreakdownContainer}>
          <div style={{background: Colors[0][1]}} className={styles.espmBox}>{data.autoScore + data.teleScore + data.endScore}</div>
          <div className={styles.espmBreakdown}>
            <div style={{background: Colors[0][3]}}>A: {data.autoScore}</div>
            <div style={{background: Colors[0][3]}}>T: {data.teleScore}</div>
            <div style={{background: Colors[0][3]}}>E: {data.endScore}</div>
          </div>
        </div>
      </div>
        <div className={styles.graphContainer}>
          <h4 className={styles.graphTitle}>ESPM Over Time</h4>
          <LineChart className={styles.lineChart} width={350} height={175} data={data.espmOverTime}>
            <XAxis type="number" dataKey="matchNum"/>
            <YAxis dataKey="score"/>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke={Colors[0][0]} strokeWidth="3"/>
            <Tooltip></Tooltip>
          </LineChart>
        </div>
      <div className={styles.valueBoxes}>
        <CBox color1={Colors[0][2]} color2={Colors[0][3]} title={"No Show"} value={(data.noShow)*100+"%"}></CBox>
        <CBox color1={Colors[0][2]} color2={Colors[0][3]} title={"Breakdown"} value={(data.breakdown)*100+"%"}></CBox>
        <CBox color1={Colors[0][2]} color2={Colors[0][3]} title={"Last Breakdown"} value={"Match " + data.lastBreakdown}></CBox>
        <CBox color1={Colors[0][2]} color2={Colors[0][3]} title={"Matches Scouted"} value={data.matchesScouted}></CBox>
        <HBox color1={Colors[0][2]} color2={Colors[0][3]} title={"Scouts"} value={(data.scouts).join(", ")}></HBox>
      </div>
      <br></br>
      <br></br>
      <div className={styles.allComments}>
        <Comments color1={Colors[0][2]} color2={Colors[0][3]} title={"General Comments"} value={(data.generalComments).join(", ")}></Comments>
        <Comments color1={Colors[0][2]} color2={Colors[0][3]} title={"Breakdown Comments"} value={(data.breakdownComments).join(", ")}></Comments>
        <Comments color1={Colors[0][2]} color2={Colors[0][3]} title={"Defense Comments"} value={(data.defenseComments).join(", ")}></Comments>
      </div>
      </div>
      <div className={styles.middleColumn}>
        <div className={styles.auto}>
          <h1 style={{color: Colors[1][0]}}>Auto</h1>
          <div className={styles.graphContainer}>
            <h4 className={styles.graphTitle}>Auto Over Time</h4>
            <LineChart className={styles.lineChart} width={350} height={175} data={data.auto.autoOverTime}>
              <XAxis type="number" dataKey="matchNum"/>
              <YAxis dataKey="score"/>
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke={Colors[1][0]} strokeWidth="3" />
              <Tooltip></Tooltip>
            </LineChart>
          </div>
          <div className={styles.valueBoxes}>
            <div className={styles.CFlex}>
              <CBox color1={Colors[1][2]} color2={Colors[1][3]} title={"Leave"} value={(data.auto.leave)*100+"%"}></CBox>
              <CBox color1={Colors[1][2]} color2={Colors[1][3]} title={"Total Notes"} value={(data.auto.autoNotes.total)}></CBox>
            </div>
            <BigBox HC1={"Success"} 
              HC2={"Avg Notes"} 
              HR1={"Amp"} 
              HR2={"Speaker"} 
              R1C1={data.auto.autoNotes.ampSuccess} 
              R1C2={data.auto.autoNotes.ampAvg}
              R2C1={data.auto.autoNotes.spkrSuccess}
              R2C2={data.auto.autoNotes.spkrAvg}
              color1={Colors[1][1]} color2={Colors[1][2]} color3={Colors[1][3]}>
            </BigBox>
          </div>
        </div>
        <div className={styles.tele}>
          <h1 style={{color: Colors[2][0]}}>Tele</h1>
          <div className={styles.graphContainer}>
            <h4 className={styles.graphTitle}>Tele Over Time</h4>
            <LineChart className={styles.lineChart} width={350} height={175} data={data.tele.teleOverTime}>
              <XAxis type="number" dataKey="matchNum"/>
              <YAxis dataKey="score"/>
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke={Colors[2][0]} strokeWidth="3" />
              <Tooltip></Tooltip>
            </LineChart>
          </div>
          <div className={styles.valueBoxes}>
            <div className={styles.CFlex} >
              <CBox color1={Colors[2][2]} color2={Colors[2][3]} title={"⬆️Notes"} value={(data.tele.teleNotes.amplified)*100+"%"}></CBox>
              <CBox color1={Colors[2][2]} color2={Colors[2][3]} title={"Total Notes"} value={data.tele.teleNotes.total}></CBox>
            </div>
            <BigBox HC1={"Success"} 
              HC2={"Avg Notes"} 
              HR1={"Amp"} 
              HR2={"Speaker"} 
              R1C1={data.tele.teleNotes.ampSuccess} 
              R1C2={data.tele.teleNotes.ampAvg}
              R2C1={data.tele.teleNotes.spkrSuccess}
              R2C2={data.tele.teleNotes.spkrAvg}
              color1={Colors[2][1]} color2={Colors[2][2]} color3={Colors[2][3]}>
            </BigBox>
          </div>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <h1 style={{color: Colors[3][0]}}>Endgame</h1>
        <br></br>
        <div className={styles.chartContainer}>
          <h4 className={styles.graphTitle}>Endgame Placement</h4>
          <VictoryPie
            className={styles.pie}
            width={175}
            height={175}
            data={EndgameData}
            colorScale={Colors[3]}
            labels={({ datum }) => `${datum.x}: ${datum.y}%`}
            labelIndicator
            labelIndicatorInnerOffset={19}
            labelIndicatorOuterOffset={5}
            style={{labels: {fontSize: 8, fontFamily: "Belleza"}}}/>
        </div>
        <div className={styles.valueBoxes}>
          <table>
            <tr>
              <td style={{backgroundColor: Colors[3][1]}} rowSpan="2">Onstage</td>
              <td style={{backgroundColor: Colors[3][2]}}>Attempt</td>
              <td style={{backgroundColor: Colors[3][2]}}>Success</td>
            </tr>
            <tr>
              <td style={{backgroundColor: Colors[3][3]}}>{(data.endgame.onstageAttempt)*100+"%"}</td>
              <td style={{backgroundColor: Colors[3][3]}}>{(data.endgame.onstageSuccess)*100+"%"}</td>
            </tr>
            <tr>
              <td style={{backgroundColor: Colors[3][1]}} rowSpan="2">Location</td>
              <td style={{backgroundColor: Colors[3][2]}}>Center</td>
              <td style={{backgroundColor: Colors[3][2]}}>Side</td>
            </tr>
            <tr>
              <td style={{backgroundColor: Colors[3][3]}}>{(data.endgame.onstagePlacement.center)*100+"%"}</td>
              <td style={{backgroundColor: Colors[3][3]}}>{(data.endgame.onstagePlacement.side)*100+"%"}</td>
            </tr>
          </table>
          <table>
            <tr>
              <td style={{backgroundColor: Colors[3][1]}} rowSpan="2">Intake</td>
              <td style={{backgroundColor: Colors[3][2]}}>Ground</td>
              <td style={{backgroundColor: Colors[3][2]}}>Source</td>
            </tr>
            <tr>
              <td className={styles.intakeCheck} style={{backgroundColor: Colors[3][3]}}><input type="checkbox" checked={data.intake.ground}></input></td>
              <td className={styles.intakeCheck} style={{backgroundColor: Colors[3][3]}}><input type="checkbox" checked={data.intake.source}></input></td>
            </tr>
          </table>
          <CBox color1={Colors[3][2]} color2={Colors[3][3]} title={"Harmony"} value={(data.endgame.harmonySuccess)*100+"%"}></CBox>
        </div>
          <div className={styles.graphContainer}>
            <h4 className={styles.graphTitle} >Qualitative Ratings</h4>
            <RadarChart outerRadius={90} width={355} height={250} data={data.qualitative}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" fontSize={14}/>
              <PolarRadiusAxis angle={10} domain={[0, 5]} />
              <Radar name={data.team} dataKey="rating" stroke={Colors[3][1]} fill={Colors[3][1]} fillOpacity={0.3} strokeWidth="3" />
            </RadarChart>
          </div>
      </div>
    </div>
  )
}
