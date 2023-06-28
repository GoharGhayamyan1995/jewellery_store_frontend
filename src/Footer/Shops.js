import parkhotel from '../Footer/images/park hotel.jpg'
import vivavana from '../Footer/images/vivavana.jpg'

function Quality() {
  return (
    <div className='shop'>
      <h2>ՄԵՐ ՄԱՍԻՆ</h2>
      <p> MonTiru-ի զարդերի տեսականուն կարող եք ծանոթանալ այցելելով Պարկ-Հոտել հյուրանոցային համալիր կամ Վիվա-Վանա գեղեցկության սրահ</p>
      <div>
        <h3>ՀՅՈՒՐԱՆՈՑ ՊԱՐԿ-ՀՈՏԵԼ</h3>
        <p>10 Vazgen Sargsyan Str., Stepanakert, Artsakh</p>
        <img src={parkhotel} alt="" />
      </div>
      <div>
        <h3>ԳԵՂԵՑԿՈՒԹՅԱՆ ՍՐԱՀ "ՎԻՎԱ-ՎԱՆԱ"</h3>
        <p>30 Azatamartikneri Sargsyan Str., Stepanakert, Artsakh</p>
        <img src={vivavana} alt="" />
      </div>
      <i>Հաճելի գնումներ ենք մաղթում ձեզ</i>
    </div>
  )
}

export default Quality;