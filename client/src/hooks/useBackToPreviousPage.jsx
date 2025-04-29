import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearPostStack } from "../redux/features/postSlice";

function useBackToPreviousPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(clearPostStack());
    const fromPage = location.state?.from || "/";
    
    navigate(fromPage);
  };

  return goBack;
}

export default useBackToPreviousPage;
