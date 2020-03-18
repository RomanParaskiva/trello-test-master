import React from 'react'
import Collumn from "./Collumn";
import AddCardBlock from "./AddCardBlock";


export const Container = ({cards}) => {
    console.log(cards)
        return (
            <div className="container df">
                <div className="collumn-blc">
                    <div className="collumn-title" style={{backgroundColor: "orange"}}>
                        <p>on-hold</p>
                    </div>
                    <Collumn id={0} cards={cards}/>
                    <AddCardBlock id={0}/>
                </div>
                <div className="collumn-blc">
                    <div className="collumn-title" style={{backgroundColor: "blue"}}>
                        <p>in-Progress</p>
                    </div>
                    <Collumn id={1} cards={cards}/>
                    <AddCardBlock id={1}/>
                </div>
                <div className="collumn-blc">
                    <div className="collumn-title" style={{backgroundColor: "yellow"}}>
                        <p>needs-review</p>
                    </div>
                    <Collumn id={2} cards={cards}/>
                    <AddCardBlock id={2}/>
                </div>
                <div className="collumn-blc">
                    <div className="collumn-title" style={{backgroundColor: "green"}}>
                        <p>approved</p>
                    </div>
                    <Collumn id={3} cards={cards}/>
                    <AddCardBlock id={3}/>
                </div>
            </div>
        )
}