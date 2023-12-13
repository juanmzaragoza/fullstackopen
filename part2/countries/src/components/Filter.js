import React from 'react'

const Filter = ({ label, filterText, handleFilter }) => {
  return (
    <div>
      {label} <input value={filterText} onChange={handleFilter} />
    </div>
  )
}

export default Filter