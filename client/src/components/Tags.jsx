import React from 'react'

const Tags = ({tag}) => {
  return (
    <span className="px-3 py-1 text-sm font-medium text-violet-200 bg-violet-900/50 rounded-full border border-violet-500/20">
    {tag}
  </span>
  )
}

export default Tags