import logoImg from '../../assets/logo.svg';
import { ContainerStyle, ContentStyle } from './styles';

interface HeaderProps {
  onOpenNewTrasactionModal: () => void;
}

export function Header({ onOpenNewTrasactionModal }: HeaderProps) {
  return (
    <ContainerStyle>
      <ContentStyle>
        <img src={logoImg} alt="dt money" />
        <button
          type="button"
          onClick={onOpenNewTrasactionModal}
        >
          Nova transação
        </button>
      </ContentStyle>
    </ContainerStyle>
  );
}