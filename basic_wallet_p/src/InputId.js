// import dependencies
import React, { useState} from 'react'

// login page component
function InputId({ setId, id }) {
  const [tempId, setTempId] = useState('')

  // call login function
  const setUserId = (e) => {
    e.preventDefault()
    setId(tempId)
  }

  // handle form values, save to local state
  const handleValueChange = (e) => {
    setTempId(
      e.target.value
    )
  }

  // render the following
  return (
    <div>
      <form onSubmit={setUserId}>
        <p>User Id:</p>
        <input
          type="text"
          name="userid"
          value={tempId}
          onChange={handleValueChange}
        />
        <br />
        <br />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default InputId