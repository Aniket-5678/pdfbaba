import React from 'react'

const Categoryform = ({value, setValue , handleSubmit}) => {
  return (
    <div className='categoryform-container'>
    <form className='catform' onSubmit={handleSubmit}>
    <input className='cat-input' type='text' placeholder='Enter your category' value={value} onChange={(e)=> setValue(e.target.value)} />
    <button className='cat-btn' type='submit'>submit</button>
    </form>
</div>
  )
}

export default Categoryform