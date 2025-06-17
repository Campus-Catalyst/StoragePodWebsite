import axios from 'axios'; 
export const getJWT = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('mock_jwt_token_12345'); 
    }, 50); 
  });
};

export const baseURL = () => {
  return 'https://nas3.campuscatalyst.info/api/v1';
};

export const getFileExplorerData = (path) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await getJWT();
      if (!token) {
        return reject(new Error('Authentication token not found. Please log in.'));
      }
      const apiUrl = `${baseURL()}/files/?path=${encodeURIComponent(path)}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


  if (response.error) {
    return reject(response.error);
  }

  return resolve(response.data.files);
} catch (error) {
  return reject(error);
}
});
};

export const deleteFileOrFolder = (itemPath) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await getJWT();
      if (!token) {
        return reject(new Error('Authentication token not found. Please log in.'));
      }
      const apiUrl = `${baseURL()}/files/?path=${encodeURIComponent(itemPath)}`;
      console.log('API Request (Delete File/Folder): Deleting item at URL:', apiUrl);
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
   if (response.error) {
    return reject(response.error);
  }

  return resolve(response.data.files);
} catch (error) {
  return reject(error);
}
  });
};
