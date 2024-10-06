//! Wrapper program for Manifest
//!

pub mod instruction;
pub mod instruction_builders;
pub mod market_info;
pub mod open_order;
pub mod processors;
pub mod wrapper_state;

use hypertree::trace;
use instruction::ManifestWrapperInstruction;
use manifest::validation::{Program, Signer};
use processors::{
    batch_upate::process_batch_update, claim_seat::process_claim_seat, create_wrapper::process_create_wrapper, deposit::process_deposit, shared::WrapperStateAccountInfo, withdraw::process_withdraw
};
use solana_program::{
    account_info::{AccountInfo, next_account_info}, declare_id, entrypoint::ProgramResult, program_error::ProgramError,
    pubkey::Pubkey, system_program
};

#[cfg(not(feature = "no-entrypoint"))]
use solana_security_txt::security_txt;

#[cfg(not(feature = "no-entrypoint"))]
security_txt! {
    name: "manifest-wrapper",
    project_url: "",
    contacts: "email:britt@cks.systems",
    policy: "",
    preferred_languages: "en",
    source_code: "https://github.com/CKS-Systems/manifest",
    auditors: ""
}

declare_id!("wMNFSTkir3HgyZTsB7uqu3i7FA73grFCptPXgrZjksL");

#[cfg(not(feature = "no-entrypoint"))]
solana_program::entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let (tag, data) = instruction_data
        .split_first()
        .ok_or(ProgramError::InvalidInstructionData)?;

    let instruction: ManifestWrapperInstruction =
        ManifestWrapperInstruction::try_from(*tag).or(Err(ProgramError::InvalidInstructionData))?;

    trace!("Instruction: {:?}", instruction);

    match instruction {
        ManifestWrapperInstruction::CreateWrapper => {
            process_create_wrapper(program_id, accounts, data)?;
        }
        ManifestWrapperInstruction::ClaimSeat => {
            process_claim_seat(program_id, accounts, data)?;
        }
        ManifestWrapperInstruction::Deposit => {
            process_deposit(program_id, accounts, data)?;
        }
        ManifestWrapperInstruction::Withdraw => {
            process_withdraw(program_id, accounts, data)?;
        }
        ManifestWrapperInstruction::BatchUpdate => {
            process_batch_update(program_id, accounts, data)?;
        }
        ManifestWrapperInstruction::CleanupWrapper => {
            let account_iter = &mut accounts.iter();

            let payer = Signer::new_payer(next_account_info(account_iter)?)?;
            let wrapper_state: WrapperStateAccountInfo =
                WrapperStateAccountInfo::new(next_account_info(account_iter)?)?;
            let _system_program: Program =
                Program::new(next_account_info(account_iter)?, &system_program::id())?;

            // Take all lamports from the wrapper
            **payer.lamports.borrow_mut() += wrapper_state.lamports();
            **wrapper_state.lamports.borrow_mut() = 0;
        }
    }

    Ok(())
}
