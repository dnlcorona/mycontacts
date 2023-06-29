import { Link } from 'react-router-dom'

import { Container, InputSearchContainer, Header, ListHeader, Card, ErrorContainer, EmptyListContainer, SearchNotFoundContainer } from './styles'

import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'
import sad from '../../assets/images/sad.svg'
import magnifierQuestion from '../../assets/images/magnifier-question.svg'
import emptyBox from '../../assets/images/empty-box.svg'

import Loader from '../../components/Loader'
import Button from '../../components/Button'
import Modal from '../../components/Modal'

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

	return (
		<Container>
			<Loader isLoading={isLoading} />

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

			{contacts.length > 0 && (
				<InputSearchContainer>
					<input
						value={searchTerm}
						type="text"
						placeholder="Pesquise pelo nome..."
						onChange={handleChangeSearchTerm}
					/>
				</InputSearchContainer>
			)}

			<Header
				justifyContent={
					hasError
						? 'flex-end'
						: (
							contacts.length > 0
								? 'space-between'
								: 'center'
						)
				}
			>
				{(!hasError && contacts.length > 0) && (
					<strong>
						{filteredContacts.length}
						{filteredContacts.length === 1 ? ' contato' : ' contatos'}
					</strong>
				)}
				<Link to="/new">Novo contato</Link>
			</Header>

			{hasError && (
				<ErrorContainer>
					<img src={sad} alt="Sad" />
					<div className="details">
						<strong>Ocorreu um erro ao obter os seus contatos!</strong>
						<Button
							type="button"
							onClick={handleTryAgain}
						>
              Tentar novamente
						</Button>
					</div>
				</ErrorContainer>
			)}

			{!hasError && (
				<>
					{(contacts.length < 1 && !isLoading) && (
						<EmptyListContainer>
							<img src={emptyBox} alt="Empty Box" />

							<p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>&quotNovo contato&quot</strong> à cima para cadastrar o seu primeiro!
							</p>
						</EmptyListContainer>
					)}

					{(contacts.length > 0 && filteredContacts.length < 1) && (
						<>
							<SearchNotFoundContainer>
								<img src={magnifierQuestion} alt="Magnifier Question" />

								<span>Nenhum resultado foi encontrado para <strong>&quot{searchTerm}&quot</strong></span>
							</SearchNotFoundContainer>
						</>
					)}

					{filteredContacts.length > 0 && (
						<ListHeader orderBy={orderBy}>
							<button type="button" onClick={handleToggleOrderBy}>
								<span>Nome</span>
								<img src={arrow} alt="Seta" />
							</button>
						</ListHeader>
					)}

					{filteredContacts.map((contact) => (
						<Card key={contact.id}>
							<div className="info">
								<div className="contact-name">
									<strong>{contact.name}</strong>
									{contact.category.name && (
										<small>{contact.category.name}</small>
									)}
								</div>
								<span>{contact.email}</span>
								<span>{contact.phone}</span>
							</div>

							<div className="actions">
								<Link to={`/edit/${contact.id}`}>
									<img src={edit} alt="Editar" />
								</Link>
								<button
									type="button"
									onClick={() => handleDeleteContact(contact)}

								>
									<img src={trash} alt="Deletar" />
								</button>
							</div>
						</Card>
					))}
				</>
			)}
		</Container>
	)
}
