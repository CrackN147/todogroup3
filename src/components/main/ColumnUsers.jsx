import { usersConfig } from "system/config";
export const ColumnUsers = () => {
  return (
    <div className="columns-block">
      <h2>Users</h2>
      <div className='column'>
        {usersConfig.map((user) => (
          <div className="userBox" key={`user-${user.id}`}>
            <img src={user.imgUrl} alt={user.name} />
            <p>{user.name} ({user.role})</p>
          </div>
        ))}
      </div>
    </div>
  );
}