import 'dotenv/config';
import * as yup from 'yup';

const schema = yup.object({
  APP_PORT: yup.number().required(),
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
