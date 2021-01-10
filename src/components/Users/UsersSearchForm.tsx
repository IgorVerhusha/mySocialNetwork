import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { FilterType } from '../../Redux/users-reducer'
import { getFilter } from '../../Redux/users-selectors'

type PropsType = {
  onFilterChanged: (filter:FilterType)=> void
}

type FriendFormType = "true" | "false" | "null"
type FormType = {
  term: string
  friend: FriendFormType
}

const usersSearchFormValidate = (values: any) => {
  const errors = {}
  return errors
}



export const UsersSearchForm: React.FC<PropsType> = (props) => {

  const filter = useSelector(getFilter)

  const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: FilterType ={
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === 'true'
    }
    props.onFilterChanged(filter)
  }

  return <div>
    <Formik
      enableReinitialize
      initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
      validate={usersSearchFormValidate}
      onSubmit={submit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type='text' name='term' />
          <Field name='friend' as='select'>
            <option value='null'>All</option>
            <option value='true'>Followed</option>
            <option value='false'>Unfollowed</option>
          </Field>
          <button type='submit'
                  //disabled={isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
}