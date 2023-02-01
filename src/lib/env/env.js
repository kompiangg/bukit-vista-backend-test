import 'dotenv/config';
import * as yup from 'yup';

const schema = yup.object({
  APP_PORT: yup.number().required(),
  ENVIRONMENT: yup.string().oneOf(['dev', 'prod']).required(),
  DATABASE_USERNAME: yup.string().required(),
  DATABASE_PASSWORD: yup.string().required(),
  DATABASE_HOST: yup.string().required(),
  DATABASE_PORT: yup.number().required(),
  DATABASE_NAME: yup.string().required(),
  JWT_SECRET_KEY: yup.string().required(),
  OMDB_ACCESS_KEY_API: yup.string().required(),
});

const validateEnv = await schema
  .validate(process.env, { abortEarly: false })
  .catch((err) => {
    console.error('[ERROR] Error on load environment variable');
    console.error(err.errors?.join('\n'));
    process.exit(1);
  });

const env = {};

Object.keys(schema.fields).forEach((each) => {
  if (validateEnv[each]) {
    env[each] = validateEnv[each];
  }
});

export default env;
