import { Card } from "../../components/Cards/card"
import React, { useState, useEffect } from 'react';

export default function Rules() {
    return (
        <>
            <Card >
                <div className="lottery_Name1" style={{ textAlign: 'center', marginBottom: 50, marginTop: 100 }}>Rules</div>
            </Card>
            <Card >
                <div className="x-font2-white1">
                    Players select 4 numbers, from 1 to 20, and try to match the numbers selected by the machine.
                </div>
            </Card>
            <Card>
                <div className="x-font2-white1">
                    The game pays as indicated below: <br />
                    &nbsp;&nbsp;* 4 matching numbers <br />
                    &nbsp;&nbsp;* 3 matching numbers <br />
                    &nbsp;&nbsp;* 2 matching numbers
                </div>
                <div className="x-font2-white1">
                    <div className="x-font2-white1">Order of numbers does matter.</div>
                    <div className="x-font2-white1" style={{ textDecoration: 'underline' }}>Example 1: player plays 4/12/5/6
                    </div>
                    <div className="x-font2-white1">
                        &nbsp;&nbsp;Case A / If draw is 4/12/5/6 = 4 winning numbers
                    </div>
                    <div className="x-font2-white1">
                        &nbsp;&nbsp;Case B / If draw is 4/12/6/5 = 2 winning numbers
                    </div>
                    <div className="x-font2-white1" style={{ textDecoration: 'underline' }}>Example 2: player plays 4/12/5/6</div>
                    <div className="x-font2-white1">
                        &nbsp;&nbsp;Case A / If draw is 3/12/5/12 = 2 winning numbers
                    </div>
                    <div>
                        &nbsp;&nbsp;Case B / If draw is 3/12/12/5 = 1 winning number
                    </div>
                </div>
            </Card>
            <Card>
                <div className="x-font2-white1 space-4">
                    Draw is made every hour, at the top of the hour.
                </div>
                <div className="x-font2-white1 space-4">
                    Tickets can be purchased up to 5 minutes before the draw.
                </div>
                <div className="x-font2-white1 space-4">
                    Tickets are purchased and prizes are paid in ICICB tokens (ATRI).
                </div>
            </Card>
            <Card>
                <div className="x-font2-white1">
                    90% of the pool is allocated as follows: <br />
                    &nbsp;&nbsp;* 70% to player(s) having 4 matching numbers <br />
                    &nbsp;&nbsp;* 20% to player(s) having 3 matching numbers <br />
                    &nbsp;&nbsp;* 10% to player(s) having 2 matching numbers <br />
                    &nbsp;&nbsp;* If there is no winner in a given category, the portion of the pool is rolled over to the next draw</div>
            </Card>
            <Card>
                <div className="x-font2-white1">
                    Calculations are rounded down and any balance is rolled over into the next draw.
                </div>
            </Card>
            <div className="space">
            </div>
        </>
    )
}
