import _ from 'lodash';

export default function solution(content){
  // BEGIN
  const data = content.split('\n').slice(1).map((el) => el.split(','));
  // console.log(`Количество партий: ${data.length}`);

  const rated = data.filter((el) => el.includes('TRUE')).length;
  // const rated = data.filter((el) => el[1] === 'TRUE').length;
  const notRated = data.filter((el) => el.includes('FALSE')).length;
  // console.log(`Соотношение игр рейтинговых игр против нерейтинговых: ${rated}:${notRated}`);

  const opening = data.map((el) => el[13]);
  const uniq = [... new Set(opening)];
  // console.log(`Все варианты дебютов: ${uniq.join(', ')}`);

  const victory = data.filter((el) => el[3] !== 'Draw');
  const lowerRatedWins = victory.reduce((acc, el) => {
    const winer = el[4];
    const witeRating = el[7];
    const blackRating = el[9]
    if ((winer === 'White' && witeRating < blackRating) || (winer === 'Black' && blackRating < witeRating)) acc += 1
    return acc;
  }, 0)
  // console.log(`Количество побед игрока с меньшим рейтингом над игроком с большим: ${lowerRatedWins}`);
  const victoryStatus = data.reduce((acc, el) => {
    const status = el[3]
    if (Object.hasOwn(acc, status)) {
      acc[status] += 1
    } else {
      acc[status] = 1
    }
    return acc
  }, {});
  console.log('Соотношение всех вариантов завершения игры:');
  for (const [stat, count] of Object.entries(victoryStatus)){
    console.log(`${stat}: ${count}`)
  }
  // END
}