import {postHttp} from './http';

const signIn = async (form) => {
  const {success} = await postHttp(`session`, {...form});

  if (success) {
    console.log(success)
  }
};

export default {
  signIn
};