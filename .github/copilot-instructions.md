# Copilot Instructions v1.0

Last Updated: 2026-02-16

---

# Table of Contents

1. Project Overview
2. Technology Used
3. Project Structure
4. Features
5. Development Guidelines
6. Code Generation Rules
7. Design System Guidelines
8. Security Best Practices
9. Testing Standards
10. Code Style Examples
11. Error Handling
12. Deployment Guidelines

---

# Project Overview

This repository hosts **SkillStake**, a decentralized skill-based challenge platform. Users can create challenges, stake ETH, submit proofs, and participate in community voting. The platform enforces all staking, voting, and reward distribution logic on-chain via Solidity smart contracts, while providing real-time updates and cross-platform experience (web + mobile). A 5% platform fee is automatically collected on resolved challenges.

The project consists of Five main layers:

- **Frontend (Web)**: Bun + Next.js + React + TypeScript + Tailwind CSS + Shadcn/UI for the web interface
- **Mobile**: Bun + React Native + Expo + TypeScript + NativeWind for the mobile app
- **Backend / API**: BUn + Node.js + Express + TypeScript + PostgreSQL + Prisma + WebSocket (Socket.io)
- **Smart Contracts**: Solidity (Foundry framework), deployed to Ethereum (Alchemy RPC)
- **Database**: PostgreSQL for off-chain metadata and indexed blockchain events

---

# Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Zustand, TanStack Query, Shadcn/UI, lucide-icons
- **Backend**: Node.js, Express, TypeScript, PostgreSQL, Prisma ORM, Bun, Socket.io, Viem for blockchain event listening
- **Smart Contracts**: Solidity, Foundry for development and testing
- **Blockchain / Web3**: Ethereum, Alchemy RPC, WalletConnect, Wagmi, RainbowKit
- **Mobile**: React Native + Expo, NativeWind, TypeScript
- **Other**: Docker for deployment, IPFS (optional for proof storage)
- **Authentication**: Clerk for secure Web2 login and wallet linking
- **Web3 Wallets**: MetaMask for web, WalletConnect for mobile
- **Web3 Libraries**: Viem for backend event listening, Wagmi for frontend RPC calls and transaction management

---

# Project Structure

## Root Structure

- `contracts/` — Solidity smart contracts, tests, and deployment scripts
- `backend/` — Express API with Viem event listeners, WebSocket, database logic
- `frontend/` — Next.js web frontend code (`app`, `components`, `lib`, `hooks`)
- `mobile/` — React Native + Expo mobile app
- `backend/prisma/` — Prisma schema for Postgres database
- `docker/` — Dockerfile's and docker-compose configurations
- `.github/` — CI/CD workflows and Copilot instructions
- `README.md` — Project overview and setup
- `/**/bun.lockb` / `/**/package.json` — Dependencies

---

# Features

- Create, stake, and submit challenges
- Submit proof via IPFS link or external URL
- Weighted community voting based on stake
- Automatic reward distribution with platform fee (5%)
- Real-time updates using Socket.io
- Web3 wallet integration (MetaMask on web, WalletConnect on mobile)
- Multi-platform support: web + mobile
- Off-chain metadata storage (challenge description, proof, user profiles)
- Clerk authentication for secure Web2 login and wallet linking
- Realtime leaderboards, reputation system (off-chain)

---

# Development Guidelines

- Backend: Use Viem to listen for on-chain events (`ChallengeCreated`, `StakePlaced`, `VoteCast`, `ChallengeResolved`) and update Postgres DB
- Frontend: Use Wagmi + RainbowKit + TanStack Query for RPC calls, transaction management, and state synchronization
- Mobile: Mirror web patterns using React Native + Expo + NativeWind
- DB: Prisma ORM for structured queries; store off-chain metadata and indexed blockchain events
- Contracts: Use Foundry for development and testing; all on-chain logic (stakes, voting, payouts) must be trustless
- Use Docker for consistent development environments

---

# Code Generation Rules

- Solidity: always use explicit visibility (`public`, `internal`), emit events for state changes, prefer custom errors over `require` strings
- Frontend: TypeScript with strict typing; prefer React function components and reusable UI components
- Backend: Type-safe API routes; validate inputs with Zod; handle blockchain events asynchronously
- Database: Use Prisma client methods for all queries; avoid raw SQL unless necessary
- Frontend + mobile styling: TailwindCSS utility-first approach; Shadcn/UI components as base
- Always link blockchain `challengeId` with DB primary key for synchronization
- Always use `type` for when define types in TypeScript, and avoid `interface` unless necessary for declaration merging
- `types` always tightly coupled with `zod` schema for validation and type inference

---

# Design System Guidelines

- Colors: CSS custom properties in `globals.css` (e.g., `--color-primary`, `--color-secondary`, `--color-success`, `--color-error`)
- Typography: System fonts or defined hierarchy in Tailwind config
- Spacing: Tailwind spacing scale (4, 8, 12…)
- Components: Reusable cards, buttons, modals, forms; consistent sizes
- Icons: `lucide-react` or custom SVGs in `public/svgIcons`.

---

# Security Best Practices

- Smart contracts: validate stakes, votes, deadlines, and prevent reentrancy
- Access control: admin functions for platform fee and treasury managed securely
- Backend: validate Clerk auth sessions and wallet signatures
- Frontend/mobile: ensure wallet signature verification before any transaction
- Never store private keys in repo; use env variables

---

# Testing Standards

- Solidity contracts: unit tests, fuzzing, edge cases using Foundry
- Backend: integration tests for API + database
- Frontend: component and state tests using testing-library for React
- Mobile: basic UI and transaction flow tests

---

# Code Style Examples

## Solidity Contract Snippet

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title SkillStake
 * @author Your Name
 * @dev A decentralized skill-based challenge platform where users can create challenges, stake ETH, submit proofs, and participate in community voting. The contract manages all on-chain logic for staking, voting, and reward distribution.
 */
contract SkillStake {

    // ----------------------------- Errors ----------------------------
    error Unauthorized();

    // ----------------------------- Events ----------------------------
    event ChallengeCreated(uint256 indexed challengeId, address indexed creator);


    // ----------------------------- Structs & Mappings ----------------------------
    /**
    * @dev Represents a skill-based challenge created by a user. Each challenge has a creator, deadline for voting, total stakes for and against, and status flags for submission and resolution.
    */
    struct Challenge {
        address creator;
        uint256 deadline;
        uint256 votingEnd;
        uint256 totalFor;
        uint256 totalAgainst;
        bool submitted;
        bool resolved;
        bool success;
    }

    mapping(uint256 => Challenge) public challenges;
    uint256 public challengeCounter;

    /**
      * @notice Creates a new challenge with the specified deadline and initial stake.
      * @param deadline The timestamp until which the challenge is active for voting.
      * @dev The caller must send an initial stake in ETH when creating the challenge.
      *      The challenge is initialized with the creator's address, deadline, and initial stake.
      *      Emits a ChallengeCreated event with the new challenge ID and creator's address.
      */
    function createChallenge(uint256 deadline) external payable {
        uint256 id = challengeCounter++;
        challenges[id] = Challenge({
            creator: msg.sender,
            deadline: deadline,
            votingEnd: 0,
            totalFor: msg.value,
            totalAgainst: 0,
            submitted: false,
            resolved: false,
            success: false
        });
        emit ChallengeCreated(id, msg.sender);
    }
}
```

## Frontend React Component Snippet

```tsx
import React from 'react';
import { Button } from '@/components/ui/button';

type ChallengeCardProps = {
	title: string;
	description: string;
	onStake: () => void;
};

export function ChallengeCard({
	title,
	description,
	onStake,
}: ChallengeCardProps) {
	return (
		<div className="p-4 border rounded-lg shadow-sm">
			<h3 className="text-lg font-semibold">{title}</h3>
			<p className="text-sm text-gray-600">{description}</p>
			<Button onClick={onStake} className="mt-4">
				Stake Now
			</Button>
		</div>
	);
}
```

## React Component with Wagmi + TanStack Query

```tsx
import { type BaseError, useReadContracts } from 'wagmi';
import { Button } from '@/components/ui/button';
import ABI from '@/contracts/abis/abi.json';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';

function ReadContract() {
	const { data, error, isPending, refetch } = useReadContracts({
		contracts: [
			{
				abi: ABI,
				address: '0xYourContractAddress',
				functionName: 'balanceOf',
				args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
			},
			{
				abi: ABI,
				address: '0xYourContractAddress',
				functionName: 'ownerOf',
				args: [BigInt(69)],
			},
			{
				abi: ABI,
				address: '0xYourContractAddress',
				functionName: 'totalSupply',
			},
		],
	});
	const [balance, ownerOf, totalSupply] = data || [];

	if (isPending) return <div>Loading...</div>;

	if (error)
		return (
			<div>
				Error: {(error as BaseError).shortMessage || error.message}
			</div>
		);

	return (
		<section className="container mx-auto p-4">
			<Card>
				<CardHeader>
					<CardTitle>Read Contract Data</CardTitle>
				</CardHeader>
				<CardContent>
					<div>Balance: {balance?.toString()}</div>
					<div>Owner of Token 69: {ownerOf?.toString()}</div>
					<div>Total Supply: {totalSupply?.toString()}</div>
				</CardContent>
				<CardFooter>
					<Button onClick={() => refetch()}>Refetch</Button>
				</CardFooter>
			</Card>
		</section>
	);
}
```

## React Native Component Snippet

```tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

type ChallengeCardProps = {
	title: string;
	description: string;
	onStake: () => void;
};

export function ChallengeCard({
	title,
	description,
	onStake,
}: ChallengeCardProps) {
	return (
		<View className="p-4 border rounded-lg shadow-sm">
			<Text className="text-lg font-semibold">{title}</Text>
			<Text className="text-sm text-gray-600">{description}</Text>
			<Button title="Stake Now" onPress={onStake} />
		</View>
	);
}
```
