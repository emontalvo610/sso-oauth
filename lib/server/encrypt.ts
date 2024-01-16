import apiClient from './axios';

export async function encryptUserSession(
  sessionQuery: string,
  uuid: string,
  email: string
) {
  const response = await fetch(`${process.env.API_URL}/v1/pb_data/decrypt`, {
    method: 'POST',
    body: sessionQuery,
    headers: {
      'PB-API-TOKEN': `${process.env.API_KEY}`
    },
    cache: 'no-store'
  });

  if (response.status === 200) {
    const data = await response.json();
    const userResponse = await apiClient.post(
      `${process.env.API_URL}/v1/pb_data/encrypt`,
      JSON.stringify({
        USER_ID: uuid,
        EMAIL: email
      })
    );

    return {
      redirect: data.REDIRECT_URL,
      encryption: userResponse.data
    };
  }

  return null;
}
