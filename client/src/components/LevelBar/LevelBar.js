import './LevelBar.scss';

function LevelBar ({level}) {
  console.log(level)

  let lvlPercentage = `${level.currExp}%`

  return (
    <div className='levelbar'>
      <div className='levelbar__container'>
        <div className='levelbar__filler' style={{width: lvlPercentage}}>
          <span className='levelbar__label'>{`${level.currExp}%`}</span>
        </div>
      </div>
      <p className='levelbar__lvl-label'>lvl</p>
      <p className='levelbar__curr-level'> {level.currLevel}</p>
    </div>
  )

}

export default LevelBar;