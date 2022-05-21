import React, { useRef, useState, useEffect } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import './divisas.styles.css'

const Divisas = () => {
  const [currencyFrom, setCurrencyFrom] = useState()
  const [currencyTo, setCurrencyTo] = useState()
  const [abrFrom, setAbrFrom] = useState()
  const [abrTo, setAbrTo] = useState()

  const hideFrom = useRef()
  const hideTo = useRef()
  const toValueRef = useRef(null);

  const {register, formState: { errors }, handleSubmit, watch, setValue, control,
  } = useForm({
    defaultValues:{
      fromValue: '',
      toValue: ''
    }
  })



  const handleOnChangeFrom = (e)=>{
    setValue('fromValue', e.target.value)
    setCurrencyFrom(e.target.value)
    hideFrom.current.style.display = 'none'
    hideTo.current.style.display = 'block'
  }

  const handleOnChangeTo = (e)=>{
    setValue('toValue', e.target.value)
    setCurrencyTo(e.target.value)
    hideTo.current.style.display = 'none'
    hideFrom.current.style.display = 'block'
  }

  const handleActiveFrom = (e)=>{
    setValue('fromValue', currencyFrom)
    setCurrencyFrom(e.target.value)
  }

  const handleActiveTo = (e)=>{
    setValue('toValue', currencyTo)
    setCurrencyTo(e.target.value)
  }


  const onSubmit = ({ fromValue, from, toValue, to }) => {
    // Last writed currency makes the calculation
    setAbrFrom(from)
    setAbrTo(to)

    if(from > to){
      setCurrencyFrom(from*toValue)
      setCurrencyTo(fromValue/from)
    }else{
      setCurrencyFrom(fromValue*to)
      setCurrencyTo(to/fromValue)
    }   
  }


  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  
  



//  useEffect(() => {
//     const url = "https://api.apilayer.com/exchangerates_data/convert?to=GBP&from=EUR&amount=12";
//     fetch(url, requestOptions)
//       .then((response) => response.json())
//       .then((json) => setData(json['results']))
//       .catch((error) => console.log(error))
//   }, [])
  
  // Symbols
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "tNvgrxMfRQYkTddFB2k4acE5dA5r4Xj9")

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      }
    const url = "https://api.apilayer.com/exchangerates_data/symbols";
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
          setIsLoading(true)
          setData(result)
        },
      (error) => {
          console.log(error)
          setIsLoading(true)
          setError(error)
    }
      )
  }, [])
  


    // if (error) {
    //   return <div> Error <div/>
    // }else if (!isLoading){
    //     return <div>loading<div/>
    // }else{

    
    

  return (
    <div className="container">
        <form 
        onChange={handleSubmit(onSubmit)}
        >


        {/* <div>
              {isLoading ? (
                <h1>Loading...</h1>
              ) : (
                data.map((divisas) => (
                  <h1>
                    {divisas.symbols}
                  </h1>
                ))
              )}
            </div> */}



          <div className="row fromTo">
            <select {...register("from")}
            onChange={handleSubmit(onSubmit)}>
              <option value="">Moneda</option>
              <option value="1">EU</option>
              <option value="20">Mex Peso</option>
            </select>

            <div ref={hideFrom} className="fromBig noselect">
            {currencyFrom} 
            </div>

            <input
            {...register("fromValue", { required: true, maxLength: 5 })}
              type="number"
              placeholder="cantidad"
              onChange={handleOnChangeFrom}
              onMouseEnter={handleActiveFrom}
              // onMouseLeave={handleActiveFrom}
              onClick={handleActiveFrom}
              className={'form-field'}
            />
          </div>


          <div className="row fromTo">

            <select {...register("to")}
            onChange={handleSubmit(onSubmit)}>
              <option value="">Moneda</option>
              <option value="1">EU dollar</option>
              <option value="20">Mex</option>
            </select>

            <div ref={hideTo} className="toBig noselect">
            {currencyTo} 
            </div>

            <input
            {...register("toValue", { maxLength: 5 })}
                type="number"
                placeholder="cantidad"
                // value={data.to}
                className={'form-field'}
                // onChange={e => setCurrencyFrom(e.target.value)}
                // onChange={e => setValue('toValue', e.target.value)}
                onChange={handleOnChangeTo}
                onMouseEnter={ handleActiveTo}
                // onMouseLeave={ handleActiveTo}
                onClick={handleActiveTo}


                // onChange={handleChange}
                control={control}
            />


          </div>

        </form>
        <br />
    
    </div>
  )
}


export default Divisas
