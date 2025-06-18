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
const apiClient = axios.create({
  baseURL: baseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json', 
  },
});
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getJWT(); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response; 
  },
  (error) => {
    
    // Example: Global handling for 401 Unauthorized
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      console.warn('Unauthorized request. Authentication failed or token expired. Consider redirecting to login.');
    }

    return Promise.reject(error); 
  }
);

export const getFileExplorerData = (path) => {
  return new Promise(async (resolve, reject) => {
    try {
      const apiUrl = `${baseURL()}/files/?path=${encodeURIComponent(path)}`;
     const response = await apiClient.get(apiUrl); 


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
      const apiUrl = `${baseURL()}/files/?path=${encodeURIComponent(itemPath)}`;
      console.log('API Request (Delete File/Folder): Deleting item at URL:', apiUrl);
       const response = await apiClient.delete(apiUrl);
   if (response.error) {
    return reject(response.error);
  }

  return resolve(response.data.files);
} catch (error) {
  return reject(error);
}
  });
};
