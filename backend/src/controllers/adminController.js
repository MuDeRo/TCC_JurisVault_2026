


const adminController = {

    // LISTAR ADVOGADOS PENDENTES
    listarPendentes: async (req, res) => {

        try {

            const advogadosPendentes =
                await advogadoRepository.listarPendentes();

            return res.status(200).json(advogadosPendentes);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: 'Erro ao listar advogados pendentes'
            });
        }
    },


    // APROVAR ADVOGADO
    aprovarAdvogado: async (req, res) => {

        try {

            const { id } = req.params;

            const advogado =
                await advogadoRepository.buscarPorId(id);

            if (!advogado) {

                return res.status(404).json({
                    message: 'Advogado não encontrado'
                });
            }

            await advogadoRepository.atualizarStatus(
                id,
                'aprovado'
            );

            return res.status(200).json({
                message: 'Advogado aprovado com sucesso'
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: 'Erro ao aprovar advogado'
            });
        }
    },


    // NEGAR ADVOGADO
    negarAdvogado: async (req, res) => {

        try {

            const { id } = req.params;

            const advogado =
                await advogadoRepository.buscarPorId(id);

            if (!advogado) {

                return res.status(404).json({
                    message: 'Advogado não encontrado'
                });
            }

            await advogadoRepository.atualizarStatus(
                id,
                'negado'
            );

            return res.status(200).json({
                message: 'Advogado negado com sucesso'
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: 'Erro ao negar advogado'
            });
        }
    }

};

export default adminController;