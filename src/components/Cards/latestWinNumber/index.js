
import { useWallet } from 'use-wallet'
import { Grid } from "@material-ui/core"
import ring from "../../../assets/img/ring.png"

const LatestWinNumbercard = (props) => {
    const { numbers } = props;

    //console.log("numbers",numbers)
    const RoundCard = ({ number }) => {
        return (
            <div className="ring-card noselect">
                <div className="ring-card-img1">
                    <img src={ring} id="" alt="" fill="" width="100%" height="100%" layout="responsive" />
                </div>
                <span>{number}</span>
            </div>
        )
    }
    return (
        <div className="latest-winnumber-card">
            <div>
                <RoundCard number={numbers[0].toString()} />
                <RoundCard number={numbers[1].toString()} />
                <RoundCard number={numbers[2].toString()} />
                <RoundCard number={numbers[3].toString()} />
            </div>
        </div>
    )
}

export { LatestWinNumbercard };