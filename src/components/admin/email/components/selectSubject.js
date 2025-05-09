import React from 'react'

const selectSubject = () => {
  return (
    <div>
        <label htmlFor='category' className='mt-3'>Subject :</label>
            <select 
              name='category'
              value={data.category} 
              onChange={handleOnChange} 
              className='p-2 bg-slate-100 border rounded'
              required
            >
            <option value={""}>category</option>

              {
                packageCategory.map((el,index) => {
                  return(
                    <option value={el.value} key={el.value+index}>{el.label}</option>
                  )
                })
              }
            </select>

            <label htmlFor='description' className='mt-3'>Description :</label>
            <textarea 
              type='text' 
              rows={3}
              placeholder='description' 
              name='description'
              value={data.description} 
              onChange={handleOnChange}
              className='h-28 bg-slate-100 border resize-none p-1'
              required
            >
            </textarea>
      
    </div>
  )
}

export default selectSubject
