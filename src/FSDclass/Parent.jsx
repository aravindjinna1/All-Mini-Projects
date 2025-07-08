import React from 'react'
import Child from './Child'
export default function Parent() {
  return (
    <div>
        <p>Parent component</p>
        <Child name={"aravind"} course={"bca"}/>
    </div>
  )
}
