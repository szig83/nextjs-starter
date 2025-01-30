'use client'

import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/react'
import { useRouter } from 'next/navigation'

export default function CustomModal({
	modalTitle,
	children,
}: {
	modalTitle: string
	children: React.ReactNode
}) {
	const router = useRouter()
	return (
		<Modal defaultOpen={true} onClose={() => router.back()}>
			<ModalContent>
				{() => (
					<>
						<ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
						<ModalBody>{children}</ModalBody>
						{/* <ModalFooter>
							<Button color="danger" variant="light" onPress={onClose}>
								Close
							</Button>
							<Button color="primary" onPress={onClose}>
								Action
							</Button>
						</ModalFooter> */}
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
