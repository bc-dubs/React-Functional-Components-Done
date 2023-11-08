/* useState is not the only hook exposed by react. The example below shows a
   component that needs to update based on data coming back from the server.
   However, we also want the component to render before the data comes back
   so that the user can see something.

   To accomplish this, we will use the useEffect hook in tandem with useState.
   The useEffect hook is useful for things like fetching data, setting up an
   pub/sub subscription, or manually editing the DOM. Essentially it is where
   your non-render code might live in your component.
*/

const React = require('react');
const { useState, useEffect } = React; // Pull useState and useEffect out of react.
const ReactDOM = require('react-dom');

const SongContainer = (props) => { // Components must start with a capital letter
    /* First we setup our songs hook so that our component will update when the
       array of songs updates. We will base it off the props.songs array.
    */
    const [songs, setSongs] = useState(props.songs);

    /* Next we register our effect. This will asynchronously run in the background
       of our component, and will not delay our component from rendering. The first
       param of useEffect is a callback function of the code we want to run in the
       background. The second is an optional array that contains the list of variables
       the effect depends on.

       Since our effect does not rely on any variables, we will leave it empty. If we
       didn't pass the array in at all, it would call our effect every time the component
       got rendered. Because we passed an array, it will only recall the effect when the
       variables in that array update. Since it is empty, it won't call again.

       When our server finally responds, we will update the songs hook which will rerender
       the component. Because this rerenders the component, if we had not passed an empty
       array as the second parameter our effect would run again causing an infinite loop.
    */
   
    // This still runs, but React gets mad at it
    // useEffect(async () => {
    //     const response = await fetch('/getSongs');
    //     const songs = await response.json();
    //     setSongs(songs);
    // }, []);

    // 2nd param is a dependency list. It contains the variables whose change should trigger the effect
    // By leaving it empty, we ask it to run only the first time the component is rendered
    // If we hadn't passed in a dependency list at all, it would run every time the component is rendered
    useEffect(() => {
        const getSongList = async () => {
            const response = await fetch('/getSongs');
            const songs = await response.json();
            setSongs(songs);
        }
        getSongList();
    }, []);
    
    /* Our effect runs in the background, so immediately our component will render with
       the code below. This is preferrable, as it shows the user the page has loaded and
       is now just waiting for data. You can see production applications do this all the time.
       For example, go to youtube. The first time you load the main page, it will show the
       right layout but with grayed out boxes in place of videos. Eventually the server
       responds with video data, and the gray boxes are replaced.

       Realistically our request for song data will likely be faster than the eye can
       process (at least when run locally). You can force a delay to see this effect
       by putting the code inside the effect within a setTimeout() for a few seconds.
       Don't do this in production, obviously.
    */
    if(songs.length === 0) {
        return (
            <div>
                <h3>No Songs Yet!</h3>
            </div>
        );
    }

    const songList = songs.map((song) => {
        return (
            <div key={song.title}>
                <h2>{song.artist} - <i>{song.title}</i></h2>
            </div>
        );
    });

    return(
        <div>
            <h1>My favorite songs!</h1>
            {songList}
        </div>
    )
}

/* Our effect and our state hook will handle rerendering the component, but w
   need to kick off the process by rendering it the first time.
*/
const init = () => {
    ReactDOM.render(
        <SongContainer songs={[]} />,
        document.getElementById('app')
    );
}

window.onload = init;

/* The below example shows what the above component might look like without the
   useState and useEffect hooks. Something like the below code may be useful if
   you are doing something else with the songs returned by the server. However,
   if you are only using them to render the component the above is better.
*/

/*
const SongContainer = (props) => {
  if(props.songs.length === 0) {
        return (
            <div>
                <h3>No Songs Yet!</h3>
            </div>
        );
    }
  
    const songList = props.songs.map((song) => {
        return (
            <div key={song.title}>
                <h2 >{song.artist} - <i>{song.title}</i></h2>
            </div>
        );
    });
  
    return (
        <div>
            <h1> My favorite songs! </h1>
            {songList}
        </div>
    )
};

const loadSongsFromServer = async () => {
    const response = await fetch('/getSongs');
    const songs = await response.json();
    ReactDOM.render(
        <SongContainer songs={songs} />,
        document.getElementById('app')
    );
};


const init = () => {
  ReactDOM.render(
    <SongContainer songs={[]} />,
    document.getElementById('app')
  );
  
  loadSongsFromServer();
};

window.onload = init;
*/