/* This demo assumes you have read and understand the React-Class-Components-Done
   demo. Be sure to take a look at that demo first before reading this one.

   Below we have what is known as a "Functional Stateless Component". React class
   components are and older syntax, that are being replaced with functional components.
   Functional components are lighter weight, and generally easier to read and make.
   The two syntaxes can be used interchangeably in a project, although it is generally
   preferrable to stick to one.

   The job of a functional component is to ultimately return some JSX to be rendered,
   much like the class component's render() function.
*/
const HelloWorld = () => {
    return (
        <div>
            Hello World!
        </div>
    );
};

/* Once we make a functional component, it is rendered the exact same way as a
   class component might be. 
*/
const init = () => {
    ReactDOM.render(<HelloWorld />, document.getElementById('app'));
};

window.onload = init;