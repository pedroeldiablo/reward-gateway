import * as React from 'react';
import {
  Formik,
  // FormikHelpers,
  // FormikProps,
  Form,
  Field,
  // FieldProps,
} from 'formik';

interface UserLabels {
  userLabels: string;
}

interface LabelsInterface {
  labels: string | null | undefined;
  setLabels: React.Dispatch<React.SetStateAction<string | null | undefined>>;
}

export const LabelsComponent = ({ labels, setLabels }: LabelsInterface) => {
  const initialValues: UserLabels = { userLabels: '' };
  return (
    <div>
      <h4>Add labels to this profile</h4>
      <p>{labels}</p>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          setLabels(values.userLabels);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <label htmlFor="userLabels">Labels</label>
          <Field
            id="userLabels"
            name="userLabels"
            placeholder="Type to add label"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};
