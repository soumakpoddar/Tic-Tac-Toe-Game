import React from 'react'
import Board from './Board'

export default class Game extends React.Component{
    constructor(){
        super()
        this.state={
            xIsNext:true,
            stepNumber:0,
            history:[
                {squares:Array(9).fill(null)}
            ]
        }
    }
    
    handleClick=(i)=>{
        const hist=this.state.history
        const curr=hist[hist.length-1]
        const squares=curr.squares
        const winner=calculateWinner(squares)

        if(winner || squares[i])
        return

        squares[i]=this.state.xIsNext ? 'X':'0'
        this.setState({
            history:hist.concat({
                squares:squares
            }),
            xIsNext:!this.state.xIsNext,
            stepNumber:hist.length
        })
    }

    render(){
        const history=this.state.history
        const curr=history[this.state.stepNumber]
        let status
        const winner=calculateWinner(curr.squares)
        if(winner)
        status='Winner is '+winner
        else
        status='Next Player is '+(this.state.xIsNext?'X':'0')
        return(
            <div className="game">
                <div className="game-board">
                    <Board clickAct={(i)=>this.handleClick(i)} squares={curr.squares}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                </div>
            </div>
        )
    }
}
function calculateWinner(squares)
{
    const possible=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i=0;i<possible.length;i++)
    {
        const [a,b,c]=possible[i]
        if(squares[a] && squares[a]==squares[b] && squares[b]==squares[c])
        return squares[a]
    }
    return null;
}