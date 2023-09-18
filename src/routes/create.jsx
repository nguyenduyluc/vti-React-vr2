import { Form, useLoaderData, redirect } from "react-router-dom";



import { updateContact } from "../contacts";

export async function action({ request, params }) {
    // get ra content ben trong form
  const formData = await request.formData();

  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);

  // sau khi update xong sẽ điều hướng về trang với id mong muốn
  return redirect(`/contacts/${params.contactId}`);
}



export default function CreateContact() {

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue=''
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue=''
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue=''
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue=''
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue=''
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}