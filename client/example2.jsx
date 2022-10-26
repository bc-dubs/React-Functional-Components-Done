/* Below, we have a functional component that makes use of React Hooks. 
   https://reactjs.org/docs/hooks-intro.html

   In the early days of functional components, all functional components were
   FSCs, meaning they were lightweight but at the cost of not having "state" in
   the same way that class components did. That meant we had to manually rerender
   them whenever we updated them. An example of this can be found at the bottom
   of this file.

   React Hooks now provide us with a way of managing state (among other things)
   within our functional components. This leads to a cleaner syntax than class
   components, while still maintaining the benefits of using state.
*/
const HelloUser = (props) => {
    /* Here we are registering a state with the React.useState hook. We give it
       an initial value for a variable (from our props object), and then extract 
       the variable and the "set" function given to us by the hook. If we use 
       setUsername, it will update the username variable and also rerender the 
       component as needed.
    */
    const [username, setUsername] = React.useState(props.username);

    /* In our JSX, we use the username variable from the useState hook. Then when
       our text input changes, we call the setUsername() function from the hook to
       update the username. This triggers the entire component to rerender, as well
       as updates the username variable.
    */
    return (
      <div>
        <p>Hello {username}</p>
        <label>Change Name: </label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
    )
}

/* Once we have set up our component, we just need to render it the first time.
   The useState hook and setUsername functions will rerender the component when the
   username updates automatically.
*/
const init = () => {
    ReactDOM.render( <HelloUser username='Austin' />,
      document.getElementById('app'));
};
  
window.onload = init;


/* The same code as above, but using a stateless component without hooks.
   Note how we have to manually rerender the component when our username updates.
   Another issue with doing things this way is that our component is now built to
   only render to the "app" div. We could potentially pass in the render target element
   as a prop, but then we end up making our component even more messy. The above
   solution is far cleaner, and utilizes react to properly update the component when needed.
*/

/*
    const HelloUser = (props) => {
        const handleNameChange = (e) => {
            ReactDOM.render(
                <HelloUser username={e.target.value} />,
                document.getElementById('app')
            );
        };

        return (
            <div>
                <p>Hello {props.username}</p>
                <label>Change Name: </label>
                <input type="text" value={props.username} onChange={handleNameChange} />
            </div>
        );
    }

    const init = () => {
        ReactDOM.render( <HelloUser username='Austin' />,
        document.getElementById('app'));
    };
    
    window.onload = init;
*/
  