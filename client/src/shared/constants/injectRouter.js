import { useNavigate, useParams, useLocation } from 'react-router-dom';

export const injectRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const location = useLocation();
    
    return (
      <Component
        navigate={navigate}
        urlParams={urlParams}
        location={location}
        {...props}
        />
    );
  };
  
  return Wrapper;
};