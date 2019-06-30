import * as React from 'react';

interface Props {
  name: string;
  job: string;
}

/*
class Profile extends React.Component<Props> {
  render() {
    const { name, job } = this.props;
    return (
      <div>
        <h1>Profile</h1>
        <div>
          <b>Name:</b> {name}
        </div>
        <div>
          <b>Job:</b> {job}
        </div>
      </div>
    );
  }
}
*/

const Profile: React.FunctionComponent<Props> = ({name, job}) => (
  <div>
    <h1>Profile</h1>
    <div>
      <b>Name:</b> {name}
    </div>
    <div>
      <b>Job:</b> {job}
    </div>
  </div>
);


export default Profile;