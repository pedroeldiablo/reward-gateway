import * as React from 'react';
import {
  Formik,
  // FormikHelpers,
  // FormikProps,
  Form,
  Field,
  // FieldProps,
} from 'formik';
import { UserPreferencesContext } from '../../context/userPreferencesContext';

interface UserLabels {
  userLabels: string;
}

interface LabelsInterface {
  labels: string | null | undefined;
  setLabels: React.Dispatch<React.SetStateAction<string | null | undefined>>;
}

export const LabelsComponent = ({ uuid }: { uuid: string }) => {
  const initialValues: UserLabels = { userLabels: '' };
  const { state, dispatch } = React.useContext(UserPreferencesContext);

  const profilePreference = state?.filter((obj) => {
    console.log(obj.id);
    console.log(obj.id === uuid);
    return obj.id === uuid;
  });

  console.log({ uuid });
  console.log({ profilePreference });

  const handleSubmit = (value: string): void => {
    if (state!.filter((profile) => profile.id === uuid).length > 0) {
      if (dispatch) {
        dispatch({
          type: 'UPDATE_LABEL',
          value: {
            label: value,
            id: uuid,
          },
        });
      }
    } else {
      if (dispatch) {
        dispatch({
          type: 'CREATE_LABEL',
          value: {
            label: value,
            id: uuid,
          },
        });
      }
    }
  };

  return (
    <div>
      <h4>Add labels to this profile {uuid}</h4>
      {!profilePreference?.length
        ? 'no labels found'
        : profilePreference.map((profile) => (
            <p key={profile.id}>{profile.label}</p>
          ))}

      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          handleSubmit(values.userLabels);
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
