import grpc from 'grpc';
import { loadSync } from '@grpc/proto-loader';
import { apiConfig } from './common/config';

const notePackageDefinition = loadSync('protos/user.proto');
const userProto: any = grpc.loadPackageDefinition(notePackageDefinition).user;

const client = new userProto.UserService(
  `${apiConfig.host}:${apiConfig.port}`,
  grpc.credentials.createInsecure(),
);

client.getUsers(null, (err: Error, res: any) => {
  if (err) return console.error(err);
  console.log('Users Details', '\n', res);
});

client.createUser({ name: 'test' }, (err: Error, res: any) => {
  if (err) return console.error(err);
  console.log('Users creation Details', '\n', res);
});
