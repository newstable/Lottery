import React, { useState, useEffect } from "react"
import { Card } from "../../components/Cards/card"
import { UnLockWalletCard } from "../../components/Cards/unlockWallet"
import { HistoryInfoCard } from '../../components/Cards/historyInfoCard';
import { LotteryContract, MultiContract } from "../../contract"

export default function BuyTicket() {
    const [winAmount, setWinAmount] = useState(10000);
    const [winNumbers, setWinNumbers] = useState([12, 1, 3, 2])
    const [round, setRound] = useState(0);
    const [issueId, setIssueId] = useState("0");
    const [winAmounts, setWinAmounts] = useState([12, 1, 3, 2])
    const [styledRoundsData, setStyledRoundsData] = useState([[]]);
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        async function getData() {
            var _issueId = await LotteryContract.issueIndex();
            setIssueId(_issueId);
            // //console.log(_issueId);
            if (_issueId.toString() == "0") {
                setWinNumbers([0, 0, 0, 0]);
                setWinAmounts([0, 0, 0, 0]);
            }
            else {
                setRound(_issueId.toString() - 1)
                var roundIDs = []
                for (var i = 0; i < _issueId; i++)
                    roundIDs.push(i);
                //get round infos
                var _RoundDatas = await MultiContract.historyDatas(roundIDs);

                var _styledRoundsData = [];
                if (roundIDs.length > 0 && typeof (_RoundDatas[0]) != "undefined") {
                    roundIDs.map((data, index) => {
                        //console.log("ssss",_RoundDatas);
                        _styledRoundsData.push([_RoundDatas[2][roundIDs.length - index - 1], _RoundDatas[0][roundIDs.length - index - 1], _RoundDatas[1][roundIDs.length - index - 1]])
                    })
                    setStyledRoundsData(_styledRoundsData);

                    setWinNumbers(_RoundDatas[0]);
                    setWinAmounts(_RoundDatas[1]);
                }
            }
        }
        getData();
    }, [])

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearchClick = () => {
        if (searchText < issueId) {
            setRound(searchText);
        }
    }

    return (
        <div>

            <div className="space">
            </div>
            <div className="container">
                <HistoryInfoCard data={styledRoundsData} />
            </div>

            <div className="space-2">
            </div>
            <Card>
                <div className="win-info-card">
                    <div className="x-font2-yellow">
                        SELECT ANY 4 LUCKY NUMBERS
                    </div>
                    <div className="x-font3-white " style={{ marginTop: 10, marginBottom: 10, fontSize: 16 }}>
                        You can select numbers from 1 to 20
                    </div>
                </div>
            </Card>
            <Card>
                <UnLockWalletCard />
            </Card>

            <div className="space">
            </div>
            <div className="space-2">
            </div>
        </div>
    )
}
