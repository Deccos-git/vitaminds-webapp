const Count = ({count}) => {

    return (
        <p style={{display: count.length > 0 ? 'block' : 'none'}}>{count.length}</p>
    )
}
  


export default Count