import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(() => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center"
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
    }
}));

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const classes = useStyles();
    const { currency, symbol } = CryptoState();
    const featchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }

    useEffect(() => {
        featchTrendingCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);
    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link
                className={classes.carouselItem}
                to={`/coins/${coin.id}`}
                key={coin.id}
            >
                <img src={coin?.image} alt={coin.name}
                    height="80" style={{ marginBottom: 10 }} />
                <span>{coin?.symbol} &nbsp;
                    <span style={{
                        color: profit ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                    }}>
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>

        )
    })

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableButtonsControls
                disableDotsControls
                autoPlay
                items={items}
                responsive={{
                    0: {
                        items: 2
                    },
                    512: {
                        items: 4
                    }
                }} />
        </div>
    )
}

export default Carousel