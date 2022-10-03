const getTimeAsString = (time) =>{
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return(
        (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
    );
}
export default getTimeAsString