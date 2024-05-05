export default function UpdateProfile() {
  return (
    <div>
      <h1>Update Profile</h1>
      <form>
        <label>
          Name
          <input type="text" />
        </label>
        <label>
          Email
          <input type="email" />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
