import { useNavigate, useParams } from 'react-router-dom';

export const injectRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    
    return (
      <Component
        navigate={navigate}
        urlParams={urlParams}
        {...props}
        />
    );
  };
  
  return Wrapper;
};