import { useEffect, useState } from 'react';

import ApiService from '../services/api';
import { registerInterceptor } from '../services/http.interceptor';

export default function useProgressInterceptor() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    registerInterceptor({
      httpClient: ApiService,
      requestCallback: () => {
        setLoading(true);
      },
      responseCallback: () => {
        setLoading(false);
      },
    });
  }, []);

  return loading;
}
