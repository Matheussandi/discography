import ReactModal from "react-modal";

// Define a interface para as propriedades do componente ConfirmationModal
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string; // Nome do álbum ou faixa a ser excluído
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: ConfirmationModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirmar remoção"
      className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      ariaHideApp={false} // Para evitar um erro relacionado à acessibilidade
    >
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 rounded">
        <p>
          Deseja realmente remover <strong>{`${itemName}`}</strong>?
        </p>
        <div className="flex justify-end mt-5 text-white">
          <button
            type="button"
            onClick={onClose}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Remover
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
