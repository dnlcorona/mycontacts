import { Container } from './styles'

import Loader from '../../components/Loader'
import Modal from '../../components/Modal'

import InputSearch from './components/InputSearch'
import Header from './components/Header'
import ErrorStatus from './components/ErrorStatus'
import EmptyList from './components/EmptyList'
import SearchNotFound from './components/SearchNotFound'
import ContactsList from './components/ContactsList'

import useHome from './useHome'

export default function Home() {
	const {
		isLoading,
		contactBeingDeleted,
		isDeleteModalVisible,
		isLoadingDelete,
		handleCloseDeleteModal,
		handleConfirmDeleteContact,
		contacts,
		handleChangeSearchTerm,
		hasError,
		filteredContacts,
		handleTryAgain,
		searchTerm,
		orderBy,
		handleToggleOrderBy,
		handleDeleteContact,
	} = useHome()

	const hasContacts = !hasError && contacts.length > 0
	const isListEmpty = !hasError && (!isLoading && !hasContacts)
	const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1)

	return (
		<Container>
			<Loader isLoading={isLoading} />

			{hasContacts && (
				<InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
			)}

			<Header
				hasError={hasError}
				qtyOfContacts={contacts.length}
				qtyOfFilteredContacts={filteredContacts.length}
			/>

			{hasError && <ErrorStatus onTryAgain={handleTryAgain}/>}
			{isListEmpty && <EmptyList />}
			{isSearchEmpty &&	<SearchNotFound searchTerm={searchTerm} />}

			{hasContacts && (
				<>
					<ContactsList
						filteredContacts={filteredContacts}
						orderBy={orderBy}
						onToggleOrderBy={handleToggleOrderBy}
						onDeleteContact={handleDeleteContact}
					/>

					<Modal
						danger
						title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"`}
						confirmLabel="Deletar"
						visible={isDeleteModalVisible}
						isLoading={isLoadingDelete}
						onCancel={handleCloseDeleteModal}
						onConfirm={handleConfirmDeleteContact}
					>
						<p>Esta ação não poderá ser desfeita!</p>
					</Modal>
				</>
			)}
		</Container>
	)
}
