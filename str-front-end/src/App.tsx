import { Form, Formik } from "formik";

function App() {
  return (
    <div className="App">
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>{/* Insert form here. */}</Form>
      </Formik>
    </div>
  );
}

export default App;
